interface ProductImageProps {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <img className="w-full min-w-15 max-w-25 h-full min-h-15 max-h-25" src={src} alt={alt} />
  );
}
