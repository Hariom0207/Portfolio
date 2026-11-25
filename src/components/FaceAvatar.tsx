import Image from "next/image";

// Round crop of the portrait with the face in the exact centre.
// (Offsets are measured for /hariom-portrait.png — face is at 56% across, 21% down.)
export default function FaceAvatar({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-white ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1203}
        height={1307}
        sizes="240px"
        className="absolute max-w-none"
        style={{ width: "136%", height: "auto", left: "-26.5%", top: "8.8%" }}
      />
    </span>
  );
}
