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
  } = data || {};

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        background: "#fff",
        padding: 32,
        color: "#222",
        lineHeight: 1.7,
        margin: "0 auto",
      }}
    >
      {/* ===== HEADER ===== */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
        <img
          src={avatarUrl || "https://placehold.co/100x100"}
          alt="avatar"
          style={{
            width: 100,
            height: 100,
            borderRadius: `${rounded}%`,
            objectFit: "cover",
            marginRight: 24,
          }}
        />
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: "700",
              color: "#333",
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
                color: "#444",
              }}
            >
              {position}
            </h2>
          )}
        </div>
      </div>

      {/* ===== PERSONAL INFO ===== */}
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

      {/* ===== SUMMARY ===== */}
      {summary && (
        <>
          <SectionHeading
            title="RINGKASAN PROFIL"
            icon={useIcon ? <EditOutlined /> : null}
          />
          <div
            style={{
              marginBottom: 24,
              fontSize: 15,
              color: "#444",
              textAlign: "justify",
              padding: "4px 8px",
              lineHeight: 1.7,
              borderRadius: 4,
              background: "#fafafa", // lembut dan senada
              boxShadow: "inset 0 0 0 1px #eee",
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
                <div style={{ fontWeight: 600, fontSize: 16 }}>
                  {e.position}
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    color: "#555",
                    marginBottom: 6,
                  }}
                >
                  {e.company}
                </div>
                <div
                  style={{
                    color: "#777",
                    fontSize: 13,
                    marginBottom: 6,
                  }}
                >
                  {formatPeriod(e.period)}
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
            title="PENDIDIKAN DAN KUALIFIKASI"
            icon={useIcon ? <ReadOutlined /> : null}
          />
          {education.map((edu, i) => {
            const e = edu || {};
            return (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{e.major}</div>
                <div style={{ fontStyle: "italic", color: "#555" }}>
                  {e.school}
                </div>
                <div style={{ color: "#777", fontSize: 13 }}>
                  {formatPeriod(e.period)}
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
                  <span style={{ color: "#777" }}>– {lang.level}</span>
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

function SectionHeading({ title, icon }) {
  return (
    <div
      style={{
        borderBottom: "2px solid #999",
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
    <div style={{ marginBottom: 4 }}>
      <strong style={{ display: "inline-block", width: 100 }}>{label}</strong> :{" "}
      {value}
    </div>
  );
}
