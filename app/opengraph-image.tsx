import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Pet Spa Box | Samoobslužná umyvárka pre psíkov a mačky";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

async function getLogoDataUrl() {
  const logo = await readFile(join(process.cwd(), "public", "logo_spa-box.png"));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

export default async function Image() {
  const logoSrc = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #f8fbff 0%, #eef7ff 42%, #efffe5 100%)",
          color: "#0f172a",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            background:
              "radial-gradient(circle at top right, rgba(129,220,255,0.3), transparent 28%), radial-gradient(circle at bottom left, rgba(198,255,108,0.24), transparent 32%)",
          }}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "56px 64px",
            gap: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "62%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "22px",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#475569",
              }}
            >
              <span>Pet Spa Box</span>
              <span
                style={{
                  display: "flex",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  background: "#c8f169",
                  color: "#0f172a",
                  letterSpacing: "0.14em",
                }}
              >
                Rezervácia 24/7
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 70,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              <span>Prídeš, zadáš kód</span>
              <span style={{ color: "#14532d" }}>a umyješ miláčika</span>
              <span>bez neporiadku doma.</span>
            </div>

            <div
              style={{
                marginTop: "26px",
                maxWidth: "680px",
                fontSize: 26,
                lineHeight: 1.45,
                color: "#334155",
              }}
            >
              Samoobslužná umyvárka pre psíkov a mačky s prístupom cez mobilný
              kód. Rýchle, čisté a pohodlné riešenie po prechádzke, blate alebo
              daždi.
            </div>
          </div>

          <div
            style={{
              width: "32%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                width: 320,
                height: 320,
                padding: 24,
                borderRadius: 44,
                background: "rgba(255,255,255,0.86)",
                boxShadow: "0 28px 80px rgba(15,23,42,0.12)",
              }}
            >
              <img
                src={logoSrc}
                alt="Pet Spa Box logo"
                width="272"
                height="272"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
