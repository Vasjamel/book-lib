
import { useRouter } from "vue-router"
import { useToast } from "vue-toast-notification"

const router = useRouter()

const handleErrors = (errors) => {
    const notify = useToast()
    errors.forEach((err, index) => {
        if (err.extensions.code === "UNATHENTICATED") {
            return router.push('/login')
        }
        index < 3 && notify.error(err.message)
    })
    return
}

export default handleErrors