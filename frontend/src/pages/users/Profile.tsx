import type { RootState } from "@store/index";
import { useSelector } from "react-redux";

export default function Profile() {

    const user = useSelector((state: RootState) => state.user.selectedUser);
    console.log('User:', user);



    return (
        <div>
            <h1>Perfil do Usuário</h1>
            <p>Aqui você pode ver e editar as informações do seu perfil.</p>
        </div>
    );
}