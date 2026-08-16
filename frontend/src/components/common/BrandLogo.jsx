import smitLogo from "../../assets/images/smit_logo.png";

function BrandLogo({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "h-7 w-auto object-contain",
    md: "h-10 w-auto object-contain",
    lg: "h-14 w-auto object-contain",
    xl: "h-20 w-auto object-contain",
  };

  const imgClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={smitLogo}
        alt="Saylani Mass IT Training (SMIT)"
        className={imgClass}
      />
    </div>
  );
}

export default BrandLogo;
