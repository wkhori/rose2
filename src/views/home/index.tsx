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
        endpoint: "https://api.mainnet-beta.solana.com",
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
          <motion.p
            className='text-slate-500 text-xl leading-relaxed'
            variants={itemVariants}
          >
            The largest project launched via <a href="https://www.pump.fun/" className="text-rose-400 hover:text-rose-500 transition duration-300 ease-in-out">pump.fun</a>. Built by Rose, shipped by Rose, and community managed BY ROSE.
          </motion.p>
        </motion.h4>
        <div id="integrated-terminal" className="min-h-[500px]"></div>
      </motion.div>
    </div>
  );
};
