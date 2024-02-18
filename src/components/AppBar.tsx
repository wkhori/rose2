import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export const AppBar = () => {
  const buttonClassname = "text-lg font-semibold px-4 py-2 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105";
  const buttonColors = "bg-rose-600 text-white hover:bg-rose-700";

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="bg-gray-800 p-4 shadow-md"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
            delayChildren: 0.3,
            duration: 0.5
          }
        }
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center w-[160px]">
          <motion.img
            src="/rose_logo.png"
            alt="Rose Logo"
            className="h-16 mr-4 "
            variants={itemVariants}
          />

        </div>
        <nav className=" hidden sm:flex">
          <motion.a
            href="https://twitter.com/Rose_onSol"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClassname} ${buttonColors} mr-4`}
            variants={itemVariants}
          >
            Twitter
          </motion.a>
          <motion.a
            href="https://t.me/Rose_onSol"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClassname} ${buttonColors} mr-4`}
            variants={itemVariants}
          >
            Telegram
          </motion.a>
          <motion.a
            href="https://dexscreener.com/solana/7td14bqshsvrbantnsv1zxw5jmxaaagjazcbphcvt6fw"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClassname} ${buttonColors}`}
            variants={itemVariants}
          >
            Chart
          </motion.a>
        </nav>
        <WalletMultiButtonDynamic className="btn-ghost btn-sm rounded-btn text-lg" />
      </div>
    </motion.div>
  );
};
