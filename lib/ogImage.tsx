import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgImage({
  eyebrow,
  title,
  dek,
}: {
  eyebrow: string;
  title: string;
  dek?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a1628",
          padding: "72px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex" }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#b5893a",
            }}
          >
            {eyebrow}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#faf9f6",
            }}
          >
            {title}
          </span>
          {dek ? (
            <span
              style={{
                marginTop: 24,
                fontSize: 28,
                lineHeight: 1.4,
                color: "rgba(250,249,246,0.75)",
                fontFamily: "sans-serif",
              }}
            >
              {dek}
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ width: 28, height: 4, backgroundColor: "#b5893a" }} />
          <span
            style={{
              marginLeft: 16,
              fontSize: 22,
              fontFamily: "sans-serif",
              color: "rgba(250,249,246,0.6)",
            }}
          >
            Retail Operations Institute
          </span>
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
