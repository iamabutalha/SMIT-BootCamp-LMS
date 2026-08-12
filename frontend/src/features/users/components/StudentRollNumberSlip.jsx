import { useRef } from 'react';
import { Download, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';

export function StudentRollNumberSlip() {
  const { user } = useAuth();
  const printableRef = useRef(null);

  const studentName = user?.name || 'DEMO STUDENT';

  // Self-contained Data URI SVG Avatar (100% offline & CORS resilient)
  const createInlineSvgAvatar = (name) => {
    const initials = (name || 'DS')
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="220" viewBox="0 0 200 220">
      <rect width="200" height="220" fill="#0B4F9C"/>
      <circle cx="100" cy="75" r="38" fill="#4DBD18"/>
      <circle cx="100" cy="75" r="32" fill="#E8F7DF"/>
      <path d="M30 185 c0-40 30-55 70-55 s70 15 70 55 Z" fill="#E8F7DF"/>
      <text x="100" y="205" font-family="Arial, sans-serif" font-size="22" font-weight="900" fill="#ffffff" text-anchor="middle">${initials}</text>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const inlineAvatar = createInlineSvgAvatar(studentName);
  const userPhoto = user?.profileImage?.url || (typeof user?.profileImage === 'string' ? user.profileImage : null);
  const avatarUrl = userPhoto || inlineAvatar;

  const studentDetails = {
    name: studentName,
    fatherName: user?.fatherName || 'ZAIN UL ABDEEN',
    cnic: user?.cnic || '4220118554605',
    rollNumber: user?.rollNumber || user?.rollNo || 'WMA-182961',
    course: user?.course || 'Web & Mobile App Development',
    batch: user?.batch || 'WMA BATCH (12)',
    avatar: avatarUrl,
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SMIT_ID_Card_${studentDetails.rollNumber}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
            
            @page {
              size: A4 portrait;
              margin: 15mm;
            }

            * {
              box-sizing: border-box;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            body {
              font-family: 'Inter', sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #ffffff;
              color: #0c0e0f;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
            }

            .cards-container {
              display: flex;
              flex-direction: row;
              gap: 30px;
              align-items: center;
              justify-content: center;
              position: relative;
              margin: 0 auto;
            }

            .dotted-divider {
              width: 2px;
              height: 440px;
              border-left: 2px dashed #cbd5e1;
            }

            .smit-card {
              width: 290px;
              height: 440px;
              background: #ffffff;
              border: 1px solid #cbd5e1;
              border-radius: 12px;
              overflow: hidden;
              position: relative;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            }

            /* SVG Ribbons */
            .ribbon-svg {
              width: 100%;
              display: block;
            }

            /* Front Content Layout */
            .front-content {
              padding: 12px 16px;
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              flex: 1;
            }

            .logo-row {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              margin-bottom: 4px;
            }

            .logo-title {
              font-size: 24px;
              font-weight: 900;
              color: #0B4F9C;
              letter-spacing: -0.5px;
            }

            .logo-title span {
              color: #4DBD18;
            }

            .program-badge {
              border: 1.5px solid #0B4F9C;
              border-radius: 6px;
              padding: 4px 10px;
              margin-top: 2px;
              margin-bottom: 10px;
              background-color: #F1F5FF;
            }

            .program-badge-text {
              font-size: 10px;
              font-weight: 800;
              color: #0B4F9C;
              text-transform: uppercase;
              line-height: 1.25;
            }

            .photo-box {
              width: 105px;
              height: 115px;
              border: 3px solid #4DBD18;
              border-radius: 4px;
              overflow: hidden;
              margin-bottom: 10px;
              background-color: #f8fafc;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .photo-box img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .name-text {
              font-size: 15px;
              font-weight: 800;
              color: #0c0e0f;
              text-transform: uppercase;
              margin-bottom: 2px;
              letter-spacing: -0.2px;
            }

            .course-text {
              font-size: 11px;
              font-weight: 600;
              color: #475569;
              margin-bottom: 8px;
            }

            .roll-text {
              font-size: 15px;
              font-weight: 900;
              color: #0c0e0f;
              letter-spacing: 0.5px;
            }

            /* Back Content Layout */
            .back-content {
              padding: 16px;
              display: flex;
              flex-direction: column;
              flex: 1;
            }

            .info-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 10px;
            }

            .info-table td {
              padding: 5px 0;
              vertical-align: bottom;
              font-size: 11px;
            }

            .info-table .lbl {
              font-weight: 700;
              color: #0c0e0f;
              width: 82px;
              white-space: nowrap;
            }

            .info-table .val {
              font-weight: 800;
              color: #0c0e0f;
              border-bottom: 1.5px solid #0c0e0f;
              padding-bottom: 2px;
              text-transform: uppercase;
            }

            .qr-box {
              text-align: center;
              margin-top: auto;
              margin-bottom: 8px;
            }

            .qr-box img {
              width: 85px;
              height: 85px;
            }

            .notice-box {
              font-size: 9.5px;
              font-weight: 700;
              color: #0c0e0f;
              text-align: center;
              line-height: 1.3;
              margin-bottom: 14px;
            }

            .signature-box {
              text-align: center;
              margin-top: auto;
              margin-bottom: 8px;
            }

            .sig-line {
              width: 140px;
              border-bottom: 1.5px solid #0c0e0f;
              margin: 0 auto 4px auto;
            }

            .sig-label {
              font-size: 9.5px;
              font-weight: 700;
              color: #0c0e0f;
            }
          </style>
        </head>
        <body>
          <div class="cards-container">
            <!-- FRONT SIDE CARD -->
            <div class="smit-card">
              <!-- Top Ribbon SVG -->
              <svg class="ribbon-svg" viewBox="0 0 290 22" fill="none">
                <rect width="290" height="16" fill="#0B4F9C"/>
                <polygon points="0,14 290,10 290,22 0,18" fill="#4DBD18"/>
              </svg>

              <div class="front-content">
                <div class="logo-row">
                  <svg viewBox="0 0 24 24" fill="#4DBD18" style="width:22px; height:22px;">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                  <div class="logo-title">SM<span>I</span>T</div>
                </div>

                <div class="program-badge">
                  <div class="program-badge-text">SAYLANI MASS IT<br/>TRAINING PROGRAM</div>
                </div>

                <div class="photo-box">
                  <img
                    src="${studentDetails.avatar}"
                    alt="${studentDetails.name}"
                    onerror="this.onerror=null; this.src='${inlineAvatar}';"
                  />
                </div>

                <div class="name-text">${studentDetails.name}</div>
                <div class="course-text">${studentDetails.course}</div>
                <div class="roll-text">${studentDetails.rollNumber}</div>
              </div>

              <!-- Bottom Ribbon SVG -->
              <svg class="ribbon-svg" viewBox="0 0 290 26" fill="none">
                <polygon points="0,4 290,0 290,14 0,10" fill="#4DBD18"/>
                <polygon points="0,10 290,14 290,26 0,26" fill="#0B4F9C"/>
              </svg>
            </div>

            <!-- DOTTED DIVIDER -->
            <div class="dotted-divider"></div>

            <!-- BACK SIDE CARD -->
            <div class="smit-card">
              <!-- Top Ribbon SVG -->
              <svg class="ribbon-svg" viewBox="0 0 290 22" fill="none">
                <rect width="290" height="16" fill="#0B4F9C"/>
                <polygon points="0,14 290,10 290,22 0,18" fill="#4DBD18"/>
              </svg>

              <div class="back-content">
                <table class="info-table">
                  <tr>
                    <td class="lbl">Name:</td>
                    <td class="val">${studentDetails.name}</td>
                  </tr>
                  <tr>
                    <td class="lbl">Father name:</td>
                    <td class="val">${studentDetails.fatherName}</td>
                  </tr>
                  <tr>
                    <td class="lbl">CNIC:</td>
                    <td class="val">${studentDetails.cnic}</td>
                  </tr>
                  <tr>
                    <td class="lbl">Course:</td>
                    <td class="val">${studentDetails.batch}</td>
                  </tr>
                </table>

                <div class="qr-box">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SMIT-${studentDetails.rollNumber}" alt="QR Code" />
                </div>

                <div class="notice-box">
                  Note: This card is for SMIT's premises<br/>only. If found please return to SMIT
                </div>

                <div class="signature-box">
                  <div class="sig-line"></div>
                  <div class="sig-label">Issuing authority</div>
                </div>
              </div>

              <!-- Bottom Ribbon SVG -->
              <svg class="ribbon-svg" viewBox="0 0 290 26" fill="none">
                <polygon points="0,4 290,0 290,14 0,10" fill="#4DBD18"/>
                <polygon points="0,10 290,14 290,26 0,26" fill="#0B4F9C"/>
              </svg>
            </div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 400);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Card className="rounded-2xl border-slate-200/80 shadow-2xs font-sans text-left overflow-hidden bg-white">
      <CardContent className="p-6 space-y-6">
        {/* Top Header & Download Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0B4F9C]" />
              <h3 className="text-base font-bold text-slate-900 tracking-tight">Official SMIT Roll Number ID Card</h3>
              <Badge className="bg-[#E8F7DF] text-[#4DBD18] font-bold text-[10px] border border-[#4DBD18]/20">
                Admin Verified
              </Badge>
            </div>
            <p className="text-xs text-slate-500">
              Download and print your official SMIT student identification and roll number card.
            </p>
          </div>

          <Button
            type="button"
            onClick={handleDownloadPDF}
            icon={<Download className="w-4 h-4" />}
            className="bg-[#0B4F9C] hover:bg-[#083b75] text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs cursor-pointer self-start sm:self-auto"
          >
            Download ID Card PDF
          </Button>
        </div>

        {/* Display Side-by-Side Cards (Front & Back) */}
        <div ref={printableRef} className="py-6 overflow-x-auto flex justify-center">
          <div className="flex flex-col lg:flex-row items-center gap-8 relative p-6 bg-slate-50/60 rounded-2xl border border-slate-200/80">
            
            {/* FRONT CARD */}
            <div className="w-[290px] h-[440px] bg-white border border-slate-300 rounded-xl overflow-hidden shadow-md flex flex-col justify-between relative shrink-0">
              {/* Top Header Ribbon SVG */}
              <svg className="w-full shrink-0" viewBox="0 0 290 22" fill="none">
                <rect width="290" height="16" fill="#0B4F9C"/>
                <polygon points="0,14 290,10 290,22 0,18" fill="#4DBD18"/>
              </svg>

              {/* Front Content */}
              <div className="p-3.5 flex flex-col items-center text-center flex-1">
                <div className="text-2xl font-black text-[#0B4F9C] tracking-tight flex items-center gap-1">
                  <span className="text-[#4DBD18]">🎓</span> SM<span className="text-[#4DBD18]">I</span>T
                </div>

                <div className="mt-1 mb-2.5 border-[1.5px] border-[#0B4F9C] bg-[#F1F5FF] rounded-md px-3 py-1">
                  <span className="text-[10px] font-extrabold text-[#0B4F9C] uppercase tracking-wider block leading-tight">
                    SAYLANI MASS IT<br />TRAINING PROGRAM
                  </span>
                </div>

                {/* Photo with Lime Border */}
                <div className="w-[105px] h-[115px] border-[3px] border-[#4DBD18] rounded-xs overflow-hidden mb-2.5 bg-slate-100 shadow-2xs flex items-center justify-center">
                  <img
                    src={studentDetails.avatar}
                    alt={studentDetails.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = inlineAvatar;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name & Course & Roll Number */}
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight mb-0.5">
                  {studentDetails.name}
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 mb-2">
                  {studentDetails.course}
                </p>
                <div className="text-sm font-black text-slate-900 tracking-wide">
                  {studentDetails.rollNumber}
                </div>
              </div>

              {/* Bottom Footer Ribbon SVG */}
              <svg className="w-full shrink-0" viewBox="0 0 290 26" fill="none">
                <polygon points="0,4 290,0 290,14 0,10" fill="#4DBD18"/>
                <polygon points="0,10 290,14 290,26 0,26" fill="#0B4F9C"/>
              </svg>
            </div>

            {/* Dotted Cut / Fold Line */}
            <div className="hidden lg:block h-[440px] border-r-2 border-dashed border-slate-300 self-stretch" />

            {/* BACK CARD */}
            <div className="w-[290px] h-[440px] bg-white border border-slate-300 rounded-xl overflow-hidden shadow-md flex flex-col justify-between relative shrink-0">
              {/* Top Header Ribbon SVG */}
              <svg className="w-full shrink-0" viewBox="0 0 290 22" fill="none">
                <rect width="290" height="16" fill="#0B4F9C"/>
                <polygon points="0,14 290,10 290,22 0,18" fill="#4DBD18"/>
              </svg>

              {/* Back Content */}
              <div className="p-4 flex flex-col flex-1 text-xs">
                <table className="w-full border-collapse mb-2">
                  <tbody>
                    <tr>
                      <td className="py-1 font-bold text-slate-900 w-22 text-[11px] align-bottom">Name:</td>
                      <td className="py-1 font-extrabold text-slate-900 border-b-2 border-slate-800 text-[11px] uppercase align-bottom">
                        {studentDetails.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900 w-22 text-[11px] align-bottom">Father name:</td>
                      <td className="py-1 font-extrabold text-slate-900 border-b-2 border-slate-800 text-[11px] uppercase align-bottom">
                        {studentDetails.fatherName}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900 w-22 text-[11px] align-bottom">CNIC:</td>
                      <td className="py-1 font-extrabold text-slate-900 border-b-2 border-slate-800 text-[11px] uppercase align-bottom">
                        {studentDetails.cnic}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900 w-22 text-[11px] align-bottom">Course:</td>
                      <td className="py-1 font-extrabold text-slate-900 border-b-2 border-slate-800 text-[11px] uppercase align-bottom">
                        {studentDetails.batch}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* QR Code */}
                <div className="my-auto text-center py-1">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SMIT-${studentDetails.rollNumber}`}
                    alt="SMIT Security QR Code"
                    className="w-20 h-20 mx-auto"
                  />
                </div>

                {/* Disclaimer Note */}
                <p className="text-[9.5px] font-bold text-slate-900 text-center leading-tight mb-3 px-1">
                  Note: This card is for SMIT&apos;s premises<br />only. If found please return to SMIT
                </p>

                {/* Issuing Authority Signature Line */}
                <div className="text-center mt-auto pb-1">
                  <div className="w-36 border-b-2 border-slate-800 mx-auto mb-1" />
                  <span className="text-[9.5px] font-bold text-slate-900">Issuing authority</span>
                </div>
              </div>

              {/* Bottom Footer Ribbon SVG */}
              <svg className="w-full shrink-0" viewBox="0 0 290 26" fill="none">
                <polygon points="0,4 290,0 290,14 0,10" fill="#4DBD18"/>
                <polygon points="0,10 290,14 290,26 0,26" fill="#0B4F9C"/>
              </svg>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StudentRollNumberSlip;
