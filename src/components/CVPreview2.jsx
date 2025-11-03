import {
  EditOutlined,
  GlobalOutlined,
  ReadOutlined,
  ShoppingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatPeriod } from "../utils/formatPeriod";

export default function CVPreview2({ data }) {
  const {
    name,
    position,
    email,
    phone,
    address,
    summary,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    avatarUrl,
    rounded = 50,
    useIcon = true,
    useHeader = true,
    colorTheme = {
      text1: "#222222",
      text2: "#555555",
      text3: "#777777",
      bg: "#F0F0F0",
    },
  } = data || {};

  const { text1, text2, text3, bg } = colorTheme || {};

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        background: "#fff",
        color: text1,
        lineHeight: 1.7,
        margin: "0 auto",
      }}
    >
      {/* ===== HEADER ===== */}
      {useHeader && (
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 24 }}
        >
          <img
            src={avatarUrl || "https://placehold.co/100x100"}
            alt="avatar"
            style={{
              width: 100,
              height: 100,
              borderRadius: `${rounded}%`,
              objectFit: "cover",
              marginRight: 24,
              border: `2px solid ${bg}`,
            }}
          />
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 700,
                color: text1,
              }}
            >
              {name || "Nama Lengkap"}
            </h1>

            {position && (
              <h2
                style={{
                  margin: "6px 0 0 0",
                  fontSize: 18,
                  fontWeight: 500,
                  color: text2,
                }}
              >
                {position}
              </h2>
            )}
          </div>
        </div>
      )}

      {/* ===== PERSONAL INFO ===== */}
      <SectionHeading
        title="DATA PRIBADI"
        icon={useIcon ? <UserOutlined /> : null}
        colorTheme={colorTheme}
      />
      <div style={{ marginBottom: 24, color: text2 }}>
        <InfoRow label="Nama" value={name || "Nama Lengkap"} />
        <InfoRow label="Nomor telepon" value={phone || "08xx-xxxx-xxxx"} />
        <InfoRow label="Email" value={email || "email@contoh.com"} />
        <InfoRow label="Alamat" value={address || "-"} />
      </div>

      {/* ===== SUMMARY ===== */}
      {summary && (
        <>
          <SectionHeading
            title="RINGKASAN PROFIL"
            icon={useIcon ? <EditOutlined /> : null}
            colorTheme={colorTheme}
          />
          <div
            style={{
              marginBottom: 24,
              fontSize: 15,
              color: text2,
              textAlign: "justify",
              lineHeight: 1.7,
            }}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </>
      )}

      {/* ===== EXPERIENCES ===== */}
      {experiences.length > 0 && (
        <>
          <SectionHeading
            title="PENGALAMAN KERJA"
            icon={useIcon ? <ShoppingOutlined /> : null}
            colorTheme={colorTheme}
          />
          {experiences.map((exp, i) => {
            const e = exp || {};
            return (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, fontSize: 16, color: text1 }}>
                  {e.position}
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    color: text2,
                    marginBottom: 6,
                  }}
                >
                  {e.company}
                </div>
                <div
                  style={{
                    color: text3,
                    fontSize: 13,
                    marginBottom: 6,
                  }}
                >
                  {formatPeriod(e)}
                </div>
                {e.description && (
                  <div
                    style={{ color: text2 }}
                    dangerouslySetInnerHTML={{
                      __html: e.description,
                    }}
                  />
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ===== EDUCATION ===== */}
      {education.length > 0 && (
        <>
          <SectionHeading
            title="PENDIDIKAN DAN KUALIFIKASI"
            icon={useIcon ? <ReadOutlined /> : null}
            colorTheme={colorTheme}
          />
          {education.map((edu, i) => {
            const e = edu || {};
            return (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, fontSize: 16, color: text1 }}>
                  {e.major}
                </div>
                <div style={{ fontStyle: "italic", color: text2 }}>
                  {e.school}
                </div>
                <div style={{ color: text3, fontSize: 13 }}>
                  {formatPeriod(e)}
                </div>
                {e.description && (
                  <div
                    style={{ color: text2 }}
                    dangerouslySetInnerHTML={{
                      __html: e.description,
                    }}
                  />
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ===== SKILLS ===== */}
      {skills.length > 0 && (
        <>
          <SectionHeading
            title="KETERAMPILAN"
            icon={useIcon ? <StarOutlined /> : null}
            colorTheme={colorTheme}
          />
          <ul style={{ marginTop: 8, color: text2 }}>
            {skills.map((s, i) => (
              <li key={i}>{s?.skill}</li>
            ))}
          </ul>
        </>
      )}

      {/* ===== LANGUAGES ===== */}
      {languages.length > 0 && (
        <>
          <SectionHeading
            title="BAHASA"
            icon={useIcon ? <GlobalOutlined /> : null}
            colorTheme={colorTheme}
          />
          <ul style={{ marginTop: 8, color: text2 }}>
            {languages.map((lang, i) => (
              <li key={i}>
                {lang?.language}{" "}
                {lang?.level ? (
                  <span style={{ color: text3 }}>– {lang.level}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ===== Sub Components ===== */

function SectionHeading({ title, icon, colorTheme }) {
  const { bg, text1 } = colorTheme || {};
  return (
    <div
      style={{
        borderBottom: `2px solid ${bg}`,
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 12,
        paddingBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 8,
        textTransform: "uppercase",
        color: text1,
      }}
    >
      {icon}
      {title}
    </div>
  );
}

const InfoRow = ({ label, value }) => (
  <table style={{ marginBottom: 4 }}>
    <tbody>
      <tr style={{ verticalAlign: "top" }}>
        <td style={{ width: 120 }}>{label}</td>
        <td style={{ width: 10 }}> : </td>
        <td>{value || "-"}</td>
      </tr>
    </tbody>
  </table>
);
