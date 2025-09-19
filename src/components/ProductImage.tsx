interface ProductImageProps {
  src: string;
  alt: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function ProductImage({ src, alt, onLoad, onError }: ProductImageProps) {
  return (
    <img src={src} alt={alt} onLoad={onLoad} onError={onError} />
  );
}
