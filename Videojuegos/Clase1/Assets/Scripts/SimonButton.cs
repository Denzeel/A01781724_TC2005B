using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

//This script handles the button's functions (Ellioth Romero - A01781724)
public class SimonButton : MonoBehaviour
{
    [SerializeField] float delay;
    Color originalColor;
    AudioSource[] audioSources;

    public void Init(int index)
    {
        
        originalColor = GetComponent<Image>().color;
    }

    public void Highlight()
    {
        StartCoroutine(ChangeColor());
    }

    IEnumerator ChangeColor() 
    {
        GetComponent<Image>().color = Color.white;
        yield return new WaitForSeconds(delay);
        GetComponent<Image>().color = originalColor;
    }
    

    //this function lets the machine play another sound thats not the same as the user's
    public void playSound()
    {
        audioSources = GetComponents<AudioSource>(); 
        audioSources[1].Play();
        
    }
    

}
