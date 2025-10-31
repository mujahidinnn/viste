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
  } = data || {};

  return (
    <div
      style={{
        fontFamily: "'Merriweather', serif",
        background: "#fff",
        color: "#222",
        lineHeight: 1.7,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "stretch",
        }}
      >
        {/* ===== PRIBADI ===== */}
        <div
          style={{
            width: "35%",
            background: "#ccc",
            padding: 24,
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
                  marginRight: 24,
                  border: "3px solid white",
                }}
              />
            </div>
          )}

          <SectionHeading
            title="DATA PRIBADI"
            icon={useIcon ? <UserOutlined /> : null}
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
              />
              <ul style={{ marginTop: 8 }}>
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
              />
              <ul style={{ marginTop: 8 }}>
                {languages.map((lang, i) => (
                  <li key={i}>
                    {lang?.language}{" "}
                    {lang?.level ? (
                      <span style={{ color: "#444" }}>– {lang.level}</span>
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
            padding: 24,
          }}
        >
          {useHeader && (
            <div
              style={{
                marginTop: 24,
                marginBottom: 60,
              }}
            >
              <h1
                style={{
                  margin: 0,
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#1a2b4c",
                }}
              >
                {name || "Nama Lengkap"}
              </h1>
              {position && (
                <h3
                  style={{
                    margin: "4px 0 0 0",
                    fontWeight: 500,
                    color: "#444",
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
              />
              <div
                style={{
                  fontSize: 15,
                  color: "#444",
                  textAlign: "justify",
                  lineHeight: 1.7,
                  borderLeft: "4px solid #ccc",
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
                        <h3 style={{ margin: 0 }}>{e.position || "Jabatan"}</h3>
                        <p
                          style={{
                            margin: 0,
                            color: "#555",
                            fontStyle: "italic",
                          }}
                        >
                          {e.company || "Perusahaan"}
                          {e.location ? `, ${e.location}` : ""}
                        </p>
                      </div>
                      <span style={{ color: "#777", fontSize: 13 }}>
                        {formatPeriod(e)}
                      </span>
                    </div>

                    {e.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: e.description,
                        }}
                        style={{ marginTop: 8 }}
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
                        <h3 style={{ margin: 0 }}>{e.major || "Jurusan"}</h3>
                        <p
                          style={{
                            margin: 0,
                            color: "#555",
                            fontStyle: "italic",
                          }}
                        >
                          {e.school || "Institusi"}
                        </p>
                      </div>
                      <span style={{ color: "#777", fontSize: 13 }}>
                        {formatPeriod(e)}
                      </span>
                    </div>

                    {e.description && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: e.description,
                        }}
                        style={{ marginTop: 8 }}
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

function SectionHeading({ title, icon }) {
  return (
    <div
      style={{
        borderBottom: "2px solid #dededeff",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 12,
        paddingBottom: 4,
        display: "flex",
        alignItems: "center",
        gap: 8,
        textTransform: "uppercase",
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
