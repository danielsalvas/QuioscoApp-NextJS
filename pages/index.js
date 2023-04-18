import { PrismaClient } from "@prisma/client"
import Layout from "@/layout/Layout";

export default function Home({ categories }) {

  return (
    <Layout className="font-bold">
      Home
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
