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
                <h2 className="font-semibold uppercase text-[11px] sm:text-[1
2px] md:text-[13px] lg:text-[14px]">
                Certifications
                </h2>
                <hr className="border-[1px] mb-1 bg-black opacity-[0.7]" />
            </>
        )}  
        {certificationsData.map((item, index) => {
          return (
            <div key={index} className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]">
              <span className="font-bold">{item.CertificateName}</span>
              {item.IssuingOrganization && <span> | {item.IssuingOrganization}</span>}
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
