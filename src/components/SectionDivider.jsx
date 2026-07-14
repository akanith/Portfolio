import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div className="w-full overflow-hidden leading-none border-0 m-0 p-0 relative h-16 md:h-24 bg-transparent -mt-1 -mb-1">
      <motion.svg
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1 }}
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-[calc(100%+1.3px)] h-[100px] md:h-[150px]"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-current text-white dark:text-gray-950 drop-shadow-sm"
        ></path>
      </motion.svg>
    </div>
  );
}
