import { styled } from "@stitches/react"
import React from "react"
import { ActivityOutline, FileOutline, PeopleOutline, SettingsOutline } from "@styled-icons/evaicons-outline"
import { Flexbox } from "../utils/helpers"
import { useHistory } from "react-router"
import { AnimatePresence, motion } from "framer-motion"

export default function Sidebar() {
  return (
    <SidebarContainer>
      <Flexbox
        css={{
          margin: 20,

          "& h2": {
            textTransform: "uppercase",
          },
        }}
      >
        <h2>HellFire</h2>
      </Flexbox>
      <SidebarOption icon={<FileOutline />} label="Posts" toPath="/posts" />
      <SidebarOption icon={<PeopleOutline />} label="Members" toPath="/members" />
      <SidebarOption icon={<SettingsOutline />} label="Settings" toPath="/settings" last/>
    </SidebarContainer>
  )
}

function SidebarOption({
  icon,
  label,
  toPath,
  last = false,
}: {
  icon: React.ReactNode
  label: string
  toPath: string
  last?: boolean
}) {
  const history = useHistory()
  console.log(toPath, history.location.pathname)

  const isActive = history.location.pathname === toPath

  return (
    <SidebarEntry
      last={last}
      onClick={() => {
        if (!isActive) history.push(toPath)
      }}
      active={isActive}
    >
      <AnimatePresence>
        {isActive && (
          <ActiveIndicator
            initial={{ x: -30, marginRight: 0, opacity: 0 }}
            exit={{
              x: -30,
              marginRight: 0,
              opacity: 0,
            }}
            animate={{
              x: -20,
              marginRight: 10,
              opacity: 1,
              transition: { duration: 0.1 },
            }}
          ></ActiveIndicator>
        )}
      </AnimatePresence>
      <EntryContentContainer>
        {icon}
        <span>{label}</span>
      </EntryContentContainer>
    </SidebarEntry>
  )
}

const SidebarContainer = styled("div", {
  position: "fixed",
  height: "100vh",
  width: "260px",
  backgroundColor: "white",
  borderRadius: "0px 30px 30px 0px",
  boxShadow: "0 0 25px 0px rgba(0,0,0,0.05)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  padding: "10px 0px",
})

const SidebarEntry = styled("div", {
  display: "flex",
  position: "relative",
  padding: 10,
  margin: "2px 5px",
  alignItems: "center",
  backgroundColor: "transparent",
  transition: "all 0.25s ease",
  color: "grey",
  borderRadius: "12px",
  cursor: "pointer",

  "& div": {
    transition: "all 0.25s ease",
  },

  "&:hover": {
    // backgroundColor: "rgba(0, 0, 0, 0.1)",

    "& div": {
      color: "black",
      transform: "translateX(5px)",
    },
  },

  variants: {
    last: {
      true: {
        marginTop: "auto",
      },
    },
    active: {
      true: {
        color: "#ec8f38",
        "& div": {
          transform: "translateX(5px)",
        },

        "&:hover": {
          // backgroundColor: "rgba(0, 0, 0, 0.1)",

          "& div": {
            color: "#ec8f38",
            transform: "translateX(5px)",
          },
        },
      },
    },
  },
})

const EntryContentContainer = styled("div", {
  display: "flex",
  flexDirection: "row",
  height: "max-content",
  alignItems: "center",

  "& svg": {
    width: "1.2rem",
  },

  "& span": {
    paddingLeft: 10,
    fontSize: "0.9rem",
  },
})

const ActiveIndicator = styled(motion.div, {
  width: 10,
  height: "100%",
  backgroundColor: "#ec8f38",
  borderRadius: 30,
  position: "absolute",
})
