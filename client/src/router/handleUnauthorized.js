import { useRouter } from "vue-router";

const handleUnathorized = () => {
    const router = useRouter()
    router.push('/login')
}

export default handleUnathorized