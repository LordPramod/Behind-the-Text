export const siteConfig = {
  name: "Behind The Text",
  description: "Text detection models",
  creator: "LordPramod",
  links: {
    repositoryUrl: "https://github.com/MrInspection/ia-startup-landing-page",
    creatorGithubUrl: "https://github.com/LordPramod",
    deploymentUrl: "https://splabs-ai-startup-lp.vercel.app/",
  },
  openGraph: {
    imageUrl: "https://splabs-ai-startup-lp.vercel.app/opengraph-image.png",
    imageWidth: 1200,
    imageHeight: 630,
  },
  twitter: {
    // dont have user name later will add
    creator: "#",
    cardType: "summary_large_image",
    imageUrl: "https://splabs-ai-startup-lp.vercel.app/opengraph-image.png",
  },
};

export type SiteConfig = typeof siteConfig;
