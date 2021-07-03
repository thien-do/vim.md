export interface PartItem {
  keyword: string;
  description: string;
}

export interface Part {
  type: string;
  description: string;
  items: PartItem[];
}

export const data = [
  {
    type: "operation",
    description: "Vim.md is a Markdown editor with Vim key bindings. You already knew how it works:",
    items: [
      {
        keyword: ":h[elp]",
        description: "open this README"
      },
      {
        keyword: ":w[rite]",
        description: "save current document (:W also works)"
      },
      {
        keyword: ":q[uit]",
        description: "close current document"
      }
    ]
  },
  {
    type: "operation",
    description: "We have real time HTML preview:",
    items: [
      {
        keyword: ":ed[itor]",
        description: "show the editor only"
      },
      {
        keyword: ":sp[lit]",
        description: "show the preview on the right"
      },
      {
        keyword: ":p[review]",
        description: "show the preview only "
      }
    ]
  },
  {
    type: "operation",
    description: "And dark mode:",
    items: [
      {
        keyword: ":dark",
        description: "dark theme"
      },
      {
        keyword: ":light",
        description: "light theme"
      }
    ]
  },
  {
    type: "operation",
    description: "And more to explore in the Library and Preferences panes:",
    items: [
      {
        keyword: ":l[ibrary]",
        description: "browse your documents"
      },
      {
        keyword: ":pr[eferences]",
        description: "preferences and sync setup"
      }
    ]
  },
  {
    type: "link",
    description: "If you have any problem or feedback:",
    items: [
      {
        keyword: "Email:",
        description: "mailto:vimdotmd@gmail.com"
      },
      {
        keyword: "Issue tracker:",
        description: "https://github.com/vimdotmd/vimdotmd"
      }
    ]
  },
]