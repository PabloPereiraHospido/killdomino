/**
 * Checks whether the player's cash balance ({@link playerHP}) has reached zero
 * and, if so, waits 2 seconds before sending the `lose` IPC message to the main
 * process to load the lose scene.
 *
 * @returns {Promise<void>}
 */
async function lose() {
    if(playerHP<=0){
        console.log("Has perdido")
        await esperar(2000);
        ipcRenderer.send('lose');
    }
}
