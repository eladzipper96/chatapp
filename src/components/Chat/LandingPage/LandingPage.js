import classes from './LandingPage.module.scss'
import { useSelector } from "react-redux"

import people from '../../../assets/people.jpg'
const LandingPage = () => {
    const name = useSelector(state => state.user.name)
    const lastname = useSelector(state => state.user.last_name)

    return <div className={classes.container}>
        <div className={classes.header}>{`Welcome`}</div>
        <div className={classes.subheader}
        >We missed you 😘
        </div>
        <div className={classes.imagecontainer}>
            <img src={people} alt='people'></img>
        </div>
    </div>
}

export default LandingPage