import React from "react";

const Certifications = ({ certificationsData }) => {
  return (
    <div>
      <div className="mt-2">
        {certificationsData.some(
          (cert) =>
            cert.CertificateName?.trim() ||
            cert.IssuingOrganization?.trim() ||
            cert.CredentialUrl?.trim()
        ) && (
          <>
          
            <h2 className="font-semibold uppercase border-b-1 border-gray-500 mb-1 text-[11px] sm:text-[14px]">Certifications
            </h2>
          </>
        )}
        {certificationsData.map((item, index) => {
          return (
            <div
              key={index}
              className="text-[11px] sm:text-[14px]"
            >
              <span className="font-bold">{item.CertificateName}</span>
              {item.IssuingOrganization && (
                <span> | {item.IssuingOrganization}</span>
              )}
              {item.CredentialUrl && (
                <span>
                  {" "}
                  -{" "}
                  <a
                    href={item.CredentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Credential
                  </a>
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Certifications;
