import { motion } from "framer-motion";
import Layout from "../../components/layout";

const About: React.FC = () => {
  return (
    <Layout>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        className="flex h-full flex-col items-center justify-center gap-5"
      >
        <h2 className="pt-2 text-5xl font-extrabold tracking-tight text-white">
          <span className="text-[hsl(280,100%,70%)]">About</span>
        </h2>
        <p className="text-2xl text-white">
          This project is a{" "}
          <span className="text-[hsl(280,100%,70%)]">T3 Stack</span> demo app
          integrated with{" "}
          <span className="text-[hsl(280,100%,70%)]">New Relic One</span>{" "}
          observability platform.
        </p>
      </motion.div>
    </Layout>
  );
};

export default About;
