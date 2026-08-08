import { QRCodeSVG } from "qrcode.react";

export default function JoinQR() {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
                Scan to Join
            </h2>

            <QRCodeSVG
                value="https://shivgarjana-sinnar-7euz.vercel.app/members"
                size={220}
            />
        </div>
    );
}