const v2Domain = "https://v2.keegandonley.com";

module.exports = [
  // origin | destination | permanent
  ["/twitter", "https://twitter.com/keegandonley"],
  ["/linkedin", "https://www.linkedin.com/in/k10y/"],
  ["/github", "https://github.com/keegandonley"],
  ["/instagram", "https://www.instagram.com/keegandonley"],
  ["/dribbble", "https://dribbble.com/keegandonley"],
  ["/dribble", "https://dribbble.com/keegandonley"], // Because typos lol
  ["/peloton", "https://members.onepeloton.com/members/jeepcode/overview"],
  ["/instagram", "https://www.instagram.com/keegandonley/"],
  ["/polywork", "https://www.polywork.com/keegandonley"],
  ["/atl", "/hi/render"],
  ["/renderatl", "/hi/render"],
  ["/render", "/hi/render"],
  ["/tailwind", "/hi/tailwind"],
  ["/tailwindconnect", "/hi/tailwind"],
  ["/helloiam", "https://helloiam.io/k"],
  ["/timeoutJS", "https://keegandonley.github.io/timeoutJS/"],
  ["/subscribe", "https://www.getrevue.co/profile/keegandonley"],
  [
    "/refer/render",
    "https://ti.to/render-atlanta/2023/discount/2023Ref-keegan@kizen.com",
  ],
  ["/vinyl", `${v2Domain}/vinyl`],
  ["/vinyl/:slug*", `${v2Domain}/vinyl/:slug*`],
  ["/contact", "/hi"],
  ["/shortcuts", `${v2Domain}/shortcuts`],
  ["/qr/:slug*", `${v2Domain}/qr/:slug*`],
  ["/bsky", "https://staging.bsky.app/profile/keegan.codes"],
  ["/bluesky", "/bsky"],
  ["/render23recap", "/slides/render23"],
  ["/v2", v2Domain],
];
