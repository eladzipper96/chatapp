import classes from './ChatRoom.module.scss';
import avatar from '../../../assets/avatar.jpg'
import search from '../../../assets/search.svg'
import dots from '../../../assets/dots.svg'
import dotsblack from '../../../assets/dots_black.svg'
import emoji from '../../../assets/emoji.svg'
import arrowright from '../../../assets/arrowright.svg'

import { useState } from 'react'

const ChatRoom = () => {

    const [showSearch, setShowSearch] = useState(false)
    const [inputValue, setInputValue] = useState("")

    return (
    <div className={classes.container}>
        <div className={classes.topbar}>
                <div className={classes.topbar_left}>
                <div className={classes.image_container}>
                    <img src={avatar} alt={'profile'}></img>
                </div>
                <div className={classes.name}>Israel Israeli</div>
                <div className={classes.time}>Last Seen: 15:50</div>
            </div>
            <div className={classes.topbar_right}>
                <img src={dots} alt="options"></img>
                <img src={search} alt='search' onClick={()=> setShowSearch(val => !val)}></img>
            </div>
        </div>

        <div className={classes.search}>
            <input placeholder='Search'></input>
            <img src={search} alt='search'></img>
        </div>

        <div className={!showSearch ? classes.chat_container : [classes.chat_container,classes.chat_container_translate].join(' ')}>
            <div className={classes.chatbox}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis orci eget massa congue dignissim. Ut urna ante, ultrices eget eleifend a, sagittis id ipsum. Duis nec sollicitudin sapien. Duis vitae lacus eget nunc eleifend egestas sed id massa. Proin euismod maximus ante, in feugiat risus consectetur at. Fusce fringilla mattis diam posuere vulputate. Aliquam neque magna, interdum sed purus in, feugiat faucibus mi. Duis ultrices ut tellus ac elementum. Etiam commodo, lorem sit amet pretium hendrerit, velit purus venenatis erat, ac imperdiet libero orci sed odio. Curabitur at sem ut enim dapibus fermentum eget at leo. Nulla facilisis placerat quam, nec viverra mi pellentesque vitae. Vestibulum porttitor lacus blandit, interdum enim id, convallis metus. Morbi rhoncus varius ante non egestas. Etiam hendrerit ullamcorper nisi. Integer aliquam, lacus eget tincidunt euismod, metus nulla blandit arcu, imperdiet sagittis lacus mi eu ipsum. Donec pretium, lectus ut consectetur eleifend, lectus arcu pellentesque enim, eleifend ultricies quam purus sit amet enim.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin arcu nunc, ultricies ultrices lacinia nec, ullamcorper at est. Nullam lobortis urna tellus, in venenatis nisl suscipit eu. Donec mattis eleifend nunc, id sollicitudin eros posuere a. Phasellus eget ex lacinia, sollicitudin magna et, tempus risus. Donec iaculis pellentesque placerat. Quisque malesuada purus ut orci fringilla bibendum. Vivamus efficitur faucibus tortor, vel condimentum tortor congue at. Sed nec mollis libero. Morbi in hendrerit eros. In facilisis massa non turpis dignissim pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce fermentum felis eu felis auctor dictum. Vestibulum posuere nibh rutrum congue venenatis. In nec mi quis lorem gravida volutpat.

Integer sed eros fringilla, viverra leo ut, posuere quam. Sed ultricies mollis est id pharetra. Pellentesque at massa at neque euismod malesuada. Curabitur suscipit risus odio, id placerat sem iaculis eget. Praesent augue elit, accumsan sit amet nibh et, finibus semper mauris. Etiam id interdum elit. Nunc pretium egestas neque ut eleifend. In feugiat sapien eu volutpat mollis. Nullam molestie arcu a ex malesuada convallis in pharetra purus. Ut cursus libero tincidunt porttitor congue.

Sed consequat dignissim dui, nec dapibus dolor pulvinar id. Sed a lorem tincidunt, tempor ipsum vitae, congue lacus. Donec accumsan accumsan eros et porta. Sed at mauris lectus. Phasellus egestas in ante a congue. Fusce dictum eros et hendrerit fringilla. Aliquam erat volutpat. Integer maximus sapien ornare quam mollis sodales. Duis eu bibendum nisl, id rutrum erat. Aenean sit amet augue in nulla fringilla ultricies at sit amet diam. Ut porttitor lorem et dui pulvinar, non tincidunt magna aliquam. Proin elementum, diam at mollis fermentum, dui ipsum scelerisque nisl, sit amet scelerisque mi nisl sed orci. Curabitur maximus nibh a ligula venenatis hendrerit. Vestibulum imperdiet mi quis ullamcorper finibus. Praesent magna dui, facilisis non congue non, pellentesque eu magna. Ut mattis dui nec nisl fringilla rutrum.

Mauris convallis posuere enim in lacinia. Cras molestie sed nisi quis malesuada. Vestibulum placerat molestie dui sed consectetur. Morbi fringilla arcu non metus dapibus aliquam. Nam tincidunt pretium nisi at lobortis. Fusce ut venenatis tellus. Suspendisse congue metus eget mauris fringilla, et cursus metus aliquam. Etiam faucibus ultricies placerat. Maecenas a lectus ac arcu vehicula suscipit id at felis. Mauris viverra purus id eros sodales accumsan. Etiam auctor enim erat, a hendrerit erat molestie eget. Integer sit amet diam eu tellus convallis hendrerit ut ut ex. Mauris aliquet dolor quis sapien tempus sollicitudin. Suspendisse vel urna turpis.

In hac habitasse platea dictumst. Suspendisse faucibus vehicula tortor non gravida. Phasellus at dui iaculis, tempus diam at, congue ante. Sed scelerisque nibh vel laoreet aliquam. Nulla sit amet bibendum velit, quis ultricies neque. Aenean vel rhoncus sapien, a finibus augue. Aenean eget euismod magna, id molestie augue. Proin feugiat quam nisi.

Curabitur pharetra dolor quis fringilla interdum. Morbi vestibulum eget metus et laoreet. Sed sit amet egestas lacus. Nunc eget tristique lorem. Fusce vestibulum nec diam eget ornare. Duis gravida sem ac nunc efficitur, nec accumsan libero tempus. Quisque pellentesque pharetra velit, at elementum purus sodales in. Nulla facilisi. Ut justo massa, vehicula eget molestie vehicula, lacinia in quam. Etiam consectetur sem at consectetur ultrices.

Donec facilisis arcu nec pretium imperdiet. Vivamus nisi dui, vulputate non nulla vel, ultricies congue ligula. Suspendisse lobortis orci a enim congue elementum. Ut lectus nibh, mollis ut orci eget, sodales sollicitudin lacus. Suspendisse vitae ligula vel libero maximus vestibulum ut vel felis. Integer ac elit in quam egestas tempus. Vivamus quam neque, interdum eget nunc malesuada, molestie tristique erat. Phasellus nibh tortor, sodales non enim vel, sollicitudin pretium metus. Praesent ultrices nunc vel sagittis rutrum. Nam varius elit sit amet massa porttitor, eu ultricies purus aliquam. Integer euismod felis purus, sit amet porttitor nulla ullamcorper in. Nullam sed nisi vel urna sagittis elementum elementum ac dui. Praesent eleifend interdum imperdiet. Aliquam justo nibh, pretium ac fermentum ac, ornare ac est. Ut vehicula euismod purus et varius.

Vestibulum non molestie mauris. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sollicitudin rhoncus nisi sed mollis. Sed posuere quam sit amet augue eleifend aliquet. Maecenas sollicitudin nisl sed efficitur porta. Suspendisse consectetur nunc est, et fermentum purus suscipit et. Duis sollicitudin nibh sagittis sapien varius volutpat. Aenean porttitor diam nec elit laoreet, in dapibus nunc tempor. Quisque eu erat aliquet, rhoncus justo ut, posuere nibh. Vivamus nec quam non mauris condimentum ultrices. Vivamus placerat metus dui, in dapibus diam consequat at. Aenean volutpat sed enim eu dapibus.

Maecenas sodales condimentum lectus, non hendrerit ligula. Ut sollicitudin finibus tortor, gravida auctor diam convallis vel. Vestibulum ultricies nulla aliquam, porttitor leo vitae, aliquam nisl. Etiam dapibus orci ipsum, nec pulvinar lorem pulvinar vitae. Etiam eu magna pretium massa tempus faucibus sed a sapien. Vivamus sit amet consequat turpis. Fusce condimentum scelerisque quam rhoncus ultrices. Morbi neque magna, vehicula id facilisis non, viverra at elit. Sed ut felis sed leo imperdiet auctor accumsan et neque.

Sed ultrices neque ipsum, ac rhoncus libero dapibus nec. Donec ac laoreet quam. Vestibulum vitae velit orci. Vivamus a ex quam. Proin quis tortor enim. Cras ultricies imperdiet lectus ut congue. Nulla malesuada sem tincidunt nisl sagittis, blandit porta velit eleifend. Nullam ultrices dui eget interdum porta.

Quisque ut felis eu augue fringilla feugiat. Vestibulum et convallis ante, condimentum vestibulum mauris. Integer dolor lectus, tristique a ipsum ac, fermentum pretium ligula. Ut eu ligula ut enim fringilla pharetra ut vitae nibh. Integer ultrices viverra nulla, sit amet malesuada ipsum suscipit eu. Cras enim nibh, maximus eu nisi eu, elementum ornare magna. Nulla vel dignissim velit.

Donec vel risus lectus. Sed imperdiet convallis laoreet. Aliquam sodales nec dui ac luctus. Maecenas eget ex vel diam dignissim commodo vehicula id dui. Suspendisse at nibh eget magna porttitor faucibus. Aenean pretium condimentum lorem, vel mollis massa. Sed molestie nec nibh quis tincidunt. Pellentesque ut accumsan ipsum. Etiam sit amet erat viverra sapien dignissim placerat nec quis nibh. Mauris maximus egestas ipsum, et hendrerit velit placerat vitae. Proin et neque dui. Mauris a eros quis elit placerat interdum. Aliquam vitae fermentum ligula.
            </div>
        </div>

        <div className={classes.input_container}>
            <input placeholder="Type your message here..." defaultValue={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}></input>
            <img className={classes.emoji_icon} src={emoji} alt='emoji'></img>
            <button type="submit" className={classes.send}>
                <img src={arrowright} alt='>'></img>
            </button>
            
        </div>
    </div>)
    
}

export default ChatRoom;