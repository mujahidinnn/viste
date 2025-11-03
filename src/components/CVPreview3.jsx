import {
  EditOutlined,
  GlobalOutlined,
  ReadOutlined,
  ShoppingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatPeriod } from "../utils/formatPeriod";

export default function CVPreview3({ data }) {
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
        fontFamily: "'Merriweather', serif",
        background: "#fff",
        color: text1,
        lineHeight: 1.7,
        margin: "0 auto",
      }}
    >
      {/* ===== BACKGROUND HEADER ===== */}
      {useHeader && (
        <div
          style={{
            background: bg,
            width: "100%",
            height: 70,
          }}
        />
      )}

      <div style={{ padding: "24px 0 24px 0" }}>
        {/* ===== HEADER ===== */}
        {useHeader && (
          <div
            style={{
              display: "flex",
              marginTop: -80,
              alignItems: "flex-end",
              padding: "0 24px",
            }}
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
                border: "3px solid white",
              }}
            />

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: text1,
                }}
              >
                {name || "Nama Lengkap"}
              </h1>
              {position ? (
                <h4
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: text2,
                  }}
                >
                  {position}
                </h4>
              ) : (
                <div style={{ minHeight: "36px" }} />
              )}
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 24,
            alignItems: "stretch",
          }}
        >
          {/* ===== PRIBADI ===== */}
          <div style={{ width: "30%" }}>
            <SectionHeading
              title="DATA PRIBADI"
              icon={useIcon ? <UserOutlined /> : null}
              colorTheme={colorTheme}
            />
            <div style={{ marginBottom: 24, color: text2 }}>
              <InfoRow label="Nama" value={name || "Nama Lengkap"} />
              <InfoRow
                label="Nomor telepon"
                value={phone || "08xx-xxxx-xxxx"}
              />
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
                    color: text2,
                    textAlign: "justify",
                    lineHeight: 1.7,
                    borderLeft: `4px solid ${bg}`,
                    paddingLeft: 12,
                  }}
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
              </>
            )}
          </div>

          {/* ===== SEPARATOR ===== */}
          <div
            style={{
              width: "2px",
              background: bg,
            }}
          />

          {/* ===== OTHER ===== */}
          <div style={{ width: "70%" }}>
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
                      <strong style={{ color: text1 }}>{e.position}</strong>
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
                  title="PENDIDIKAN"
                  icon={useIcon ? <ReadOutlined /> : null}
                  colorTheme={colorTheme}
                />
                {education.map((edu, i) => {
                  const e = edu || {};
                  return (
                    <div key={i} style={{ marginBottom: 24 }}>
                      <strong style={{ color: text1 }}>{e.major}</strong>
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
        </div>
      </div>
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

function InfoRow({ label, value }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <strong>{label}</strong> : <span>{value || "-"}</span>
    </div>
  );
}
