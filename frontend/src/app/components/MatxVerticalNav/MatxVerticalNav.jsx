import { Box, ButtonBase, Icon, styled } from "@mui/material";
import useSettings from "app/hooks/useSettings";
import React from "react";
import { NavLink } from "react-router-dom";
import { Span } from "../Typography";
import { GiTrophy } from "react-icons/gi";
import { MatxVerticalNavExpansionPanel } from "..";

const ExtAndIntCommon = {
    display: "flex",
    overflow: "hidden",
    borderRadius: "4px",
    height: 44,
    whiteSpace: "pre",
    marginBottom: "8px",
    textDecoration: "none",
    justifyContent: "space-between",
    transition: "all 150ms ease-in",
    "&:hover": { background: "rgba(255, 255, 255, 0.08)" },
    "&.compactNavItem": {
        overflow: "hidden",
        justifyContent: "center !important",
    },
    "& .icon": {
        fontSize: "30px",
        marginLeft: 12,
        verticalAlign: "middle",
    },
};

const InternalLink = styled(Box)(({ theme }) => ({
    "& a": {
        ...ExtAndIntCommon,
        color: theme.palette.text.primary,
    },
    "& .navItemActive": {
        backgroundColor: "rgba(255, 255, 255, 0.16)",
    },
}));

const StyledText = styled(Span)(({ mode }) => ({
    fontSize: "1rem",
    paddingLeft: "0.8rem",
    display: mode === "compact" && "none",
}));

const BadgeValue = styled("div")(() => ({
    padding: "1px 8px",
    overflow: "hidden",
    borderRadius: "300px",
}));

const MatxVerticalNav = ({ items }) => {
    const { settings } = useSettings();
    const { mode } = settings.layout1Settings.leftSidebar;

    const renderLevels = (data) => {
        return data.map((item, index) => {
            if (item.children) {
                return (
                    <>
                        <MatxVerticalNavExpansionPanel mode={mode} item={item} key={index}>
                            {renderLevels(item.children)}
                        </MatxVerticalNavExpansionPanel>
                    </>
                );
            } else {
                return (
                    <InternalLink key={index}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? `navItemActive ${mode === "compact" && "compactNavItem"
                                    }`
                                    : `${mode === "compact" && "compactNavItem"}`
                            }
                        >
                            <ButtonBase
                                key={item.name}
                                name="child"
                                sx={{ width: "100%" }}
                            >
                                {item?.icon !== "trophy" ? (
                                    <Icon className="icon" sx={{ width: 36 }}>
                                        {item.icon}
                                    </Icon>
                                ) : (
                                    <GiTrophy
                                        fontSize={30}
                                        style={{
                                            marginLeft: 12,
                                        }}
                                    />
                                )}
                                <StyledText
                                    mode={mode}
                                    className="sidenavHoverShow"
                                >
                                    {item.name}
                                </StyledText>

                                <Box mx="auto" />

                                {item.badge && (
                                    <BadgeValue className="sidenavHoverShow">
                                        {item.badge.value}
                                    </BadgeValue>
                                )}
                            </ButtonBase>
                        </NavLink>
                    </InternalLink>
                );
            }

        });
    };

    return <div className="navigation">{renderLevels(items)}</div>;
};

export default React.memo(MatxVerticalNav);
