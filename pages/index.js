import { PrismaClient } from "@prisma/client"
import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";

export default function Home({ categories }) {

  const { actualCategory } = useQuiosco()

  return (
    <Layout page={`${actualCategory?.name} Menu`}>
      <h1 className="text-4xl font-black md:text-start text-center">
        {actualCategory?.name}
      </h1>
      <p className="text-2xl my-10">Choose your order: </p>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient()

  const categories = await prisma.category.findMany()

  return {
    props: {
      categories,
    }
  }
}
