export default function Instructions() {
  return (
    <section>
      <h2>Instrucciones</h2>
      <ol>
        <li>El tablero tiene 100 casillas numeradas del 1 al 100.</li>
        <li>Cada jugador comienza en la posición 0.</li>
        <li>En tu turno lanza un dado de 1 a 6 y avanza esa cantidad de casillas.</li>
        <li>Si caes en el inicio de una escalera subes hasta su casilla final.</li>
        <li>Si caes en la cabeza de un tobogán bajas hasta su casilla final.</li>
        <li>Para ganar debes llegar exactamente a la casilla 100.</li>
        <li>El tablero se dibuja como una cuadr&iacute;cula de 10x10 y se muestra automaticamente al iniciar la partida.</li>
        <li>Las escaleras, toboganes y fichas de jugador se representan con sprites de colores.</li>
      </ol>
      <h3>Escaleras y Toboganes</h3>
      <table>
        <thead>
          <tr><th>Inicio</th><th>Fin</th><th>Tipo</th></tr>
        </thead>
        <tbody>
          <tr><td>4</td><td>14</td><td>Escalera</td></tr>
          <tr><td>9</td><td>31</td><td>Escalera</td></tr>
          <tr><td>20</td><td>38</td><td>Escalera</td></tr>
          <tr><td>28</td><td>84</td><td>Escalera</td></tr>
          <tr><td>40</td><td>59</td><td>Escalera</td></tr>
          <tr><td>63</td><td>81</td><td>Escalera</td></tr>
          <tr><td>71</td><td>91</td><td>Escalera</td></tr>
          <tr><td>16</td><td>6</td><td>Tobogán</td></tr>
          <tr><td>47</td><td>26</td><td>Tobogán</td></tr>
          <tr><td>49</td><td>11</td><td>Tobogán</td></tr>
          <tr><td>56</td><td>53</td><td>Tobogán</td></tr>
          <tr><td>62</td><td>19</td><td>Tobogán</td></tr>
          <tr><td>64</td><td>60</td><td>Tobogán</td></tr>
          <tr><td>87</td><td>24</td><td>Tobogán</td></tr>
          <tr><td>93</td><td>73</td><td>Tobogán</td></tr>
          <tr><td>95</td><td>75</td><td>Tobogán</td></tr>
          <tr><td>98</td><td>78</td><td>Tobogán</td></tr>
        </tbody>
      </table>
    </section>
  );
}
