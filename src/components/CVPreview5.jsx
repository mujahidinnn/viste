import {
  EditOutlined,
  GlobalOutlined,
  ReadOutlined,
  ShoppingOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatPeriod } from "../utils/formatPeriod";

export default function CVPreview5({ data }) {
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
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* ===== PRIBADI ===== */}
        <div
          style={{
            width: "35%",
            background: bg,
            padding: 24,
            minHeight: "calc(297mm - 24mm)",
            boxSizing: "border-box",
          }}
        >
          {/* HEADER */}
          {useHeader && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 36,
                marginTop: 24,
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
                  border: `3px solid ${text3}`,
                }}
              />
            </div>
          )}

          <SectionHeading
            title="DATA PRIBADI"
            icon={useIcon ? <UserOutlined /> : null}
            color={text1}
            borderColor={text3}
          />
          <div style={{ marginBottom: 24 }}>
            <InfoRow label="Nama" value={name || "Nama Lengkap"} />
            <InfoRow label="Nomor telepon" value={phone || "08xx-xxxx-xxxx"} />
            <InfoRow label="Email" value={email || "email@contoh.com"} />
            <InfoRow label="Alamat" value={address || "-"} />
          </div>

          {/* ===== SKILLS ===== */}
          {skills.length > 0 && (
            <>
              <SectionHeading
                title="KETERAMPILAN"
                icon={useIcon ? <StarOutlined /> : null}
                color={text1}
                borderColor={text3}
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
                color={text1}
                borderColor={text3}
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

        {/* ===== OTHER ===== */}
        <div
          style={{
            width: "65%",
            paddingLeft: 16,
          }}
        >
          {useHeader && (
            <div
              style={{
                marginTop: 24,
                marginBottom: 84,
              }}
            >
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
                <h3
                  style={{
                    margin: "4px 0 0 0",
                    fontWeight: 500,
                    color: text2,
                  }}
                >
                  {position}
                </h3>
              )}
            </div>
          )}

          {/* ===== SUMMARY ===== */}
          {summary && (
            <>
              <SectionHeading
                title="RINGKASAN PROFIL"
                icon={useIcon ? <EditOutlined /> : null}
                color={text1}
                borderColor={bg}
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

          {/* ===== EXPERIENCES ===== */}
          {experiences.length > 0 && (
            <>
              <SectionHeading
                title="PENGALAMAN KERJA"
                icon={useIcon ? <ShoppingOutlined /> : null}
                color={text1}
                borderColor={bg}
              />
              {experiences.map((exp, i) => {
                const e = exp || {};
                return (
                  <div key={i} style={{ marginBottom: 24 }}>
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
                        <p
                          style={{
                            margin: 0,
                            color: text2,
                            fontStyle: "italic",
                          }}
                        >
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
                        dangerouslySetInnerHTML={{
                          __html: e.description,
                        }}
                        style={{ marginTop: 8, color: text2 }}
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
                color={text1}
                borderColor={bg}
              />
              {education.map((edu, i) => {
                const e = edu || {};
                return (
                  <div key={i} style={{ marginBottom: 24 }}>
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
                        <p
                          style={{
                            margin: 0,
                            color: text2,
                            fontStyle: "italic",
                          }}
                        >
                          {e.school || "Institusi"}
                        </p>
                      </div>
                      <span style={{ color: text3, fontSize: 13 }}>
                        {formatPeriod(e)}
                      </span>
                    </div>

                    {e.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: e.description,
                        }}
                        style={{ marginTop: 8, color: text2 }}
                      />
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===== Sub Components ===== */

function SectionHeading({ title, icon, color, borderColor }) {
  return (
    <div
      style={{
        borderBottom: `2px solid ${borderColor}`,
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 12,
        paddingBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 8,
        textTransform: "uppercase",
        color,
      }}
    >
      {icon}
      {title}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <strong>{label}</strong> :<p>{value || "-"}</p>
    </div>
  );
}
