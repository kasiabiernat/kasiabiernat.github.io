import type { Site, Socials, Page } from "@types";

export const SITE: Site = {
  NAME: "Kasia Biernat-Kluba",
  EMAIL: "k.biernat0@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_TALKS_ON_HOMEPAGE: 3,
};

export const PAGES: { [key: string]: Page } = {
  HOME: {
    TITLE: "Home",
    HREF: "/",
    DESCRIPTION: "Personal homepage",
  },
  BLOG: {
    TITLE: "Blog",
    HREF: "/blog",
    DESCRIPTION: "A collection of articles on topics I am passionate about",
  },
  TALKS: {
    TITLE: "Talks",
    HREF: "/talks",
    DESCRIPTION: "My talks and presentations.",
  },
};

export const SOCIALS: Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://x.com/kathrine000",
  },
  {
    NAME: "github",
    HREF: "https://github.com/kathrine0",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/kbiernat/",
  },
];
