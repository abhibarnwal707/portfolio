import type { ImageMetadata } from 'astro';
import rsVideo from '../assets/work/rs-video.jpg';
import ptAlert from '../assets/work/pt-alert-queue.jpg';
import ptInvestigator from '../assets/work/pt-investigator.jpg';
import ptShap from '../assets/work/pt-shap.png';
import ptStill from '../assets/work/pt-demo-still.jpg';
import crStill from '../assets/work/cr-demo-still.jpg';
import hyderabad from '../assets/place/hyderabad-financial-district.jpg';

export interface Picture {
  src: ImageMetadata;
  alt: string;
  caption: string;
  /** CSS object-position used when the picture is cropped. */
  focus?: string;
  /** Show the whole picture on its own ground instead of cropping it. */
  fit?: 'contain';
  bg?: string;
}

export interface Loop {
  /** A muted video or an animated WebP in /public, recorded from the project's own demo. */
  kind: 'video' | 'image';
  src: string;
  width: number;
  height: number;
  poster: ImageMetadata;
  alt: string;
  caption: string;
}

export interface ProjectMedia {
  cover: Picture;
  gallery: Picture[];
  loop?: Loop;
}

// Every picture here is the project's own: screenshots and recordings from its repo or demo video.
export const media: Record<'redstring' | 'papertrail' | 'cartrank', ProjectMedia> = {
  redstring: {
    cover: {
      src: rsVideo,
      alt: 'RedString title card: the redstring wordmark beside a graph linking threat actor, MITRE ATT&CK, CVE/NVD, CISA KEV and threat report nodes',
      caption: 'RedString, title card of the demo video',
      fit: 'contain',
      bg: '#ffffff',
    },
    gallery: [],
  },
  papertrail: {
    cover: {
      src: ptAlert,
      alt: 'PaperTrail alert queue: 200 flagged accounts, a risk-mix chart, hourly payment activity and the riskiest accounts first',
      caption: 'PaperTrail, the alert queue',
      focus: '40% 30%',
    },
    gallery: [
      {
        src: ptInvestigator,
        alt: 'PaperTrail investigator agent: gather evidence, draft with an LLM, check every number, cite sources, with a verified case summary',
        caption: 'The investigator agent, every number checked against tool outputs',
      },
      {
        src: ptShap,
        alt: 'SHAP chart of mean impact per feature; is_ach and s_uniq_out have the largest impact',
        caption: 'SHAP drivers across alerts',
      },
    ],
    loop: {
      kind: 'image',
      src: '/media/pt-demo.webp',
      width: 1000,
      height: 625,
      poster: ptStill,
      alt: 'PaperTrail demo recording, moving from the alert queue into an investigation',
      caption: 'PaperTrail demo, recorded from the app',
    },
  },
  cartrank: {
    cover: {
      src: crStill,
      alt: 'CartRank results for “red stapler under $20, 4 stars and up, not electric”: parsed filters and the ranked top ten',
      caption: 'CartRank, a plain-English query parsed into filters',
      focus: '30% 40%',
    },
    gallery: [],
    loop: {
      kind: 'video',
      src: '/media/cr-demo.webm',
      width: 760,
      height: 475,
      poster: crStill,
      alt: 'CartRank demo recording: typing plain-English queries and watching the ranked results change',
      caption: 'CartRank demo, recorded from the app',
    },
  },
};

export const place: Picture = {
  src: hyderabad,
  alt: 'Towers of the Financial District in Hyderabad under a blue sky',
  caption: 'Financial District, Hyderabad',
};

export const placeCredit = {
  text: 'Photo: “Financial District, Hyderabad” by iMahesh, CC BY-SA 4.0, via Wikimedia Commons',
  href: 'https://commons.wikimedia.org/wiki/File:Financial_District,_Hyderabad_-_Skyline_featuring_Aparna_Zenon_and_SAS_iRA_under_construction.jpg',
};
