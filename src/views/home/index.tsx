import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((state) => state.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;
    if (!isLoaded || !window?.Jupiter) {
      intervalId = setInterval(() => {
        setIsLoaded(!!window?.Jupiter);
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && window?.Jupiter) {
      window?.Jupiter.init({
        displayMode: "integrated",
        integratedTargetId: "integrated-terminal",
        endpoint: "https://mainnet.helius-rpc.com/?api-key=4e9e35e9-d81b-4ccd-bcc5-e6dfac69c293",
        formProps: {
          fixedOutputMint: true,
          initialOutputMint: "7td14bqshsvrbantnsv1zxw5jmxaaagjazcbphcvt6fw",
        },
      });
    }
  }, [isLoaded]);

  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="md:hero mx-auto p-4">
      <motion.div
        className="md:hero-content flex flex-col"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold mb-1 text-center"
        >
          Welcome to <span className="text-rose-600">ROSE ON SOL</span>
        </motion.h1>
        <motion.h4
          variants={itemVariants}
          className="md:w-full text-2xl md:text-4xl text-center text-slate-300 my-2"
        >
          The greatest project built by the greatest dev, ROSE.
          </motion.h4>
          <motion.p
            className='text-slate-500 text-xl text-center leading-relaxed mx-5 mt-4 mb-2'
            variants={itemVariants}
          >
         {"$ROSE, the wildest meme coin born from the Telegram Rose bot, exploded onto the Solana scene as its most epic crowdfunded, community-driven spectacle. Launched through a no-holds-barred fair drop on pump.fun, this project flips the script with zero devs, pure anarchy, and governance by the meme lords themselves. Riding high on Solana's lightning-fast chain, $ROSE embodies the soul of the degen dream: fast, furious, and freakin' equitable. It’s not just a coin; it’s a badge of honor in the wild west of crypto, proving when degens unite, they're unstoppable. Join the $ROSE riot, where every holder is a pioneer in the new frontier of finance—decentralized, democratic, and downright degen. "}         </motion.p>
 
        <div id="integrated-terminal" className="min-h-[500px]"></div>
      </motion.div>
    </div>
  );
};


