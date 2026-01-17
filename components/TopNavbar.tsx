import Image from 'next/image';

export const TopNavbar = () => {
  return (
    <nav className="fixed top-6 left-6 z-50">
      <Image 
        src="/robin-logo.png" 
        alt="Robin Wood Logo" 
        width={60} 
        height={60}
      />
    </nav>
  );
};
