import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa6";
import { FaPaintRoller } from "react-icons/fa6";
import './ChangeBackground.css';
import { FaRegCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";

const ChangeBackground = () => {
    const boardsData = useSelector(state => state.boardsReducer);
    const board = boardsData.current;
    const [activeBg, setActiveBg] = useState(board.background.active);
    let isActiveColorBg = activeBg === 'color';

    const switchBtnClasses = type => {
        const btnColor = document.querySelector(`.bg-types .btn-color`);
        const btnUrl = document.querySelector(`.bg-types .btn-url`);

        switch (type) {
            case 'url':
                btnColor.classList.remove('active');
                btnUrl.classList.add('active');
                break;
            case 'color':
                btnColor.classList.add('active');
                btnUrl.classList.remove('active');
                break;
            default:
                break;
        }
    }

    const changeActive = (e, type) => {
        e.preventDefault();

        setActiveBg(type);
        switchBtnClasses(type)
    }

    const resetBgColor = e => {
        e.preventDefault();

        const inputColor = document.querySelector('.bg-color input');

        inputColor.value = '#1f2229';
    }

    useEffect(() => {
        switchBtnClasses(board.background.active);
    }, [board.background.active]);

    return (
        <>
            <p>Background</p>
            <div className="change-bg">
                <div className="bg-types">
                    <button
                        type="button"
                        className="btn-color"
                        onClick={e => changeActive(e, 'color')}><FaPaintRoller /></button>
                    <button
                        type="button"
                        className="btn-url"
                        onClick={e => changeActive(e, 'url')}><FaImage /></button>
                </div>
                {isActiveColorBg && <label htmlFor="bgColor">Color</label>}
                {isActiveColorBg
                    && <div className="bg-color">
                        <button onClick={e => resetBgColor(e)}><FaRegCircleXmark /></button>
                        <input
                            type="color"
                            name="bgColor"
                            defaultValue={board.background.data.bgColor ?? '#1f2229'} />
                    </div>}
                {!isActiveColorBg && <label htmlFor="bgUrl">Image URL</label>}
                {!isActiveColorBg && <input
                    type="url"
                    name="bgUrl"
                    placeholder="https://example.com"
                    defaultValue={board.background.data.bgUrl}
                />}
            </div>
        </>
    )
}

export default ChangeBackground;