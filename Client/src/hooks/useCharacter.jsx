import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {getCharacterDetail, cleanDetail} from "../redux/actions";

const useCharacter = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const character = useSelector((state) => state.characterDetail);

    useEffect(() => {
        dispatch(getCharacterDetail(id));
        return () => {
            dispatch(cleanDetail());
        };
    }, [dispatch, id]);

    return character;
};

export default useCharacter;