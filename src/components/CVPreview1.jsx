import {
  GlobalOutlined,
  ReadOutlined,
  ShoppingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatPeriod } from "../utils/formatPeriod";

export default function CVPreview1({ data }) {
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
        fontFamily: "Arial, sans-serif",
        background: "#fff",
        color: text1,
        lineHeight: 1.6,
      }}
    >
      {/* ===== HEADER ===== */}
      {useHeader && (
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 24 }}
        >
          <div>
            <img
              src={avatarUrl || "https://placehold.co/80"}
              alt="avatar"
              style={{
                width: 80,
                height: 80,
                minHeight: 80,
                minWidth: 80,
                borderRadius: `${rounded}%`,
                objectFit: "cover",
                border: `2px solid ${bg}`,
                marginRight: 16,
              }}
            />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, color: text1 }}>
              {name || "Nama Lengkap"}
            </h1>
            <h3 style={{ margin: "4px 0", fontWeight: 400, color: text2 }}>
              {position || "Posisi / Jabatan"}
            </h3>
          </div>
        </div>
      )}

      {/* ===== PERSONAL INFO ===== */}
      <SectionTitle
        colorTheme={bg}
        icon={useIcon ? <UserOutlined /> : null}
        title="Data Pribadi"
      />
      <div style={{ marginBottom: 16 }}>
        <InfoRow label="Nama" value={name || "Nama Lengkap"} />
        <InfoRow label="Email" value={email || "email@contoh.com"} />
        <InfoRow label="Nomor telepon" value={phone || "08xx-xxxx-xxxx"} />
        <InfoRow label="Alamat" value={address || "-"} />
      </div>

      {/* ===== SUMMARY ===== */}
      {summary && (
        <div
          style={{
            marginBottom: 24,
            borderLeft: `4px solid ${bg}`,
            paddingLeft: 12,
            color: text2,
          }}
          dangerouslySetInnerHTML={{ __html: summary }}
        />
      )}

      {/* ===== EXPERIENCE ===== */}
      {experiences.length > 0 && (
        <>
          <SectionTitle
            colorTheme={bg}
            icon={useIcon ? <ShoppingOutlined /> : null}
            title="Pengalaman Kerja"
          />
          {experiences.map((exp, i) => {
            const e = exp || {};
            return (
              <div
                key={i}
                style={{
                  marginBottom: 20,
                  borderBottom: "1px solid #eee",
                  paddingBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, color: text1 }}>
                      {e.position || "Jabatan"}
                    </h3>
                    <p style={{ margin: 0, color: text2, fontStyle: "italic" }}>
                      {e.company || "Perusahaan"}
                      {e.location ? `, ${e.location}` : ""}
                    </p>
                  </div>
                  <span style={{ color: text3, fontSize: 13 }}>
                    {formatPeriod(e)}
                  </span>
                </div>

                {e.description && (
                  <div
                    style={{ marginTop: 8, color: text2 }}
                    dangerouslySetInnerHTML={{ __html: e.description }}
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
          <SectionTitle
            colorTheme={bg}
            icon={useIcon ? <ReadOutlined /> : null}
            title="Pendidikan"
          />
          {education.map((edu, i) => {
            const e = edu || {};
            return (
              <div
                key={i}
                style={{
                  marginBottom: 20,
                  borderBottom: "1px solid #eee",
                  paddingBottom: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0, color: text1 }}>
                      {e.major || "Jurusan"}
                    </h3>
                    <p style={{ margin: 0, color: text2, fontStyle: "italic" }}>
                      {e.school || "Institusi"}
                    </p>
                  </div>
                  <span style={{ color: text3, fontSize: 13 }}>
                    {formatPeriod(e)}
                  </span>
                </div>

                {e.description && (
                  <div
                    style={{ marginTop: 8, color: text2 }}
                    dangerouslySetInnerHTML={{ __html: e.description }}
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
          <SectionTitle
            colorTheme={bg}
            icon={useIcon ? <StarOutlined /> : null}
            title="Keterampilan"
          />
          <ul style={{ marginTop: 4, color: text2 }}>
            {skills.map((s, i) => (
              <li key={i}>{s?.skill}</li>
            ))}
          </ul>
        </>
      )}

      {/* ===== LANGUAGES ===== */}
      {languages.length > 0 && (
        <>
          <SectionTitle
            colorTheme={bg}
            icon={useIcon ? <GlobalOutlined /> : null}
            title="Bahasa"
          />
          <ul style={{ marginTop: 4, color: text2 }}>
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

/* ========== Helper Components ========== */

const SectionTitle = ({ icon, title, colorTheme }) => (
  <div
    style={{
      background: colorTheme,
      padding: "6px 12px",
      borderRadius: 4,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 600,
    }}
  >
    {icon}
    <span>{title}</span>
  </div>
);

const InfoRow = ({ label, value }) => (
  <table style={{ margin: "4px 0" }}>
    <tbody>
      <tr style={{ verticalAlign: "top" }}>
        <td style={{ width: 120 }}>{label}</td>
        <td style={{ width: 10 }}> : </td>
        <td> {value || "-"}</td>
      </tr>
    </tbody>
  </table>
);
