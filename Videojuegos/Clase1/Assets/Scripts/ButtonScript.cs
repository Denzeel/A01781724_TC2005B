using System.Collections;
using System.Collections.Generic;
using UnityEngine;


//This script handles the fuctions related to scene management (Ellioth Romero - A01781724)
public class ButtonScript : MonoBehaviour
{
   public void goToSimonGame(){
    UnityEngine.SceneManagement.SceneManager.LoadScene("Simon");
   }
   public void goToMenu(){
    UnityEngine.SceneManagement.SceneManager.LoadScene("Menu");
   }

   public void moveButton(){
      LeanTween.moveLocalY(gameObject, transform.localPosition.y - 140f, 0.5f);
   }
}
