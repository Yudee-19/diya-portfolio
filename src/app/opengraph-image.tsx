import { ImageResponse } from "next/og";

// Shared Open Graph / social-share image. Living at the app root, it applies
// to every route (Next uses the nearest opengraph-image up the tree).
export const alt = "Kasturi Pal — Creative Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf8f3",
          padding: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            border: "2px solid #222220",
            color: "#222220",
          }}
        >
          <div
            style={{ display: "flex", fontSize: 28, letterSpacing: 14, color: "#73706a" }}
          >
            FASHION DESIGNER
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontWeight: 700,
              letterSpacing: -4,
              marginTop: 12,
            }}
          >
            KASTURI PAL
          </div>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 3,
              background: "#222220",
              marginTop: 36,
              marginBottom: 36,
            }}
          />
          <div
            style={{ display: "flex", fontSize: 40, letterSpacing: 6, color: "#3a382f" }}
          >
            CREATIVE PORTFOLIO
          </div>
        </div>
      </div>
    ),
    size,
  );
}
