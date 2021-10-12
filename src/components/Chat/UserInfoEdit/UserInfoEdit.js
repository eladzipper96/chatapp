import classes from './UserInfoEdit.module.scss';

const UserInfoEdit = () => {
    return (
    <div className={classes.container}>
        <div className={classes.top}>
            <div className={classes.header}>Settings</div>
            <div className={classes.header_desc}>{'Update Personal Infodmration & Settings'}</div>
        </div>

        <div className={classes.main}>

            <div className={classes.item}>
               <div className={classes.itemtop}>
                    <div className={classes.itemheader}>Account</div>
                    <div>{'Update personal & contact information'}</div>
               </div> 
               <div className={[classes.inputs,classes.account].join(' ')}>
                    <div className={classes.input}>
                        <label>First Name</label>
                        <input></input>
                    </div>
                    <div className={classes.input}>
                        <label>Last Name</label>
                        <input></input>
                    </div>
                    <div className={classes.input}>
                        <label>Mobile Number</label>
                        <input></input>
                    </div>
                    <div className={classes.input}>
                        <label>Birth date</label>
                        <input></input>
                    </div>
                    <div className={classes.input}>
                        <label>Email address</label>
                        <input></input>
                    </div>
                    <div className={classes.input}>
                        <label>Website</label>
                        <input></input>
                    </div>
                    <div className={[classes.input,classes.inputlong].join(' ')}>
                        <label>Address</label>
                        <input></input>
                    </div>
               </div> 
               <div className={classes.buttons}>
                    <div>Reset</div>
                    <div className={classes.savechanges}>Save Changes</div>
               </div> 
            </div>
        
        
        <div className={classes.item}>
        <div className={classes.itemtop}>
                    <div className={classes.itemheader}>Social network profiles</div>
                    <div>{'Update personal & contact information'}</div>
               </div> 
               <div className={classes.inputs}>
                    <div className={classes.input}>
                        <label>Facebook</label>
                        <input></input>
                    </div>
                    <div className={classes.input}>
                        <label>Twitter</label>
                        <input></input>
                    </div>
                    <div className={classes.input}>
                        <label>Instagram</label>
                        <input></input>
                    </div>
                    <div className={classes.input}>
                        <label>Linkedin</label>
                        <input></input>
                    </div>
               </div> 

               <div className={classes.buttons}>
                    <div>Reset</div>
                    <div className={classes.savechanges}>Save Changes</div>
               </div> 
        </div> 
        
        <div className={classes.item}>
        <div className={classes.itemtop}>
                    <div className={classes.itemheader}>Password</div>
                    <div>{'Update personal & contact information'}</div>
               </div> 
               <div className={classes.inputs}>
                    <div className={[classes.input,classes.cur_pass].join(' ')}>
                        <label>Current Password</label>
                        <input></input>
                    </div>
                    <div className={[classes.input,classes.new_pass].join(' ')}>
                        <label>New Password</label>
                        <input></input>
                    </div>
                    <div className={[classes.input,classes.rep_pass].join(' ')}>
                        <label>Repeat Passworrd</label>
                        <input></input>
                    </div>
               </div> 

               <div className={classes.buttons}>
                    <div>Reset</div>
                    <div className={classes.savechanges}>Save Changes</div>
               </div> 
        </div> 
        </div> 
    </div>
    )
}

export default UserInfoEdit;