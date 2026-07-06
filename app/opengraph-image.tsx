import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";
import { SITE_DESCRIPTION } from "@/lib/site";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Retail Operations Institute";

export default function Image() {
  return renderOgImage({
    eyebrow: "Retail Systems Research",
    title: "Retail performance is engineered, not accidental.",
    dek: SITE_DESCRIPTION,
  });
}
