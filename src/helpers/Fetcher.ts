import { Common } from "../modules/Common";
import { Validator } from "./PasswordInputValidation";
import { HIDDEN } from "../constants/classNames";
import { DEVELEPOMENT_URL, POST, GET } from "../constants/Fetchers";
import { responseData } from "../interfaces/Fetchers";

const PASSWORD_INPUT_ELEMENT = "password";
const ELEMENT_DOES_NOT_EXIST = "element nie istnieje";
const PASSWORD = "haslo";
const MUST_PUT_VALID_PASS = "Musisz wprowadzić poprawne hasło !";
const MUST_PUT_VALID_VAL = "Musisz wprowadzić wartości !";
const LOGIN_STATUS_MESSAGE = "LoginStatus";
const START_THE_GAME = "startTheGame";

interface formData {
  [key: string]: FormDataEntryValue;
}

export class Fetcher extends Common {
  private formElement: HTMLElement | null;
  public constructor(formElement: HTMLElement | null) {
    super();
    this.formElement = formElement;
  }

  public async sendDataToBackendAuth(
    form: FormData,
    parentName: string
  ): Promise<void> {
    const LoginStatus: HTMLElement =
      this.bindElementByClass(LOGIN_STATUS_MESSAGE);
    const startGamePanel: HTMLElement = this.bindElementByClass(START_THE_GAME);

    let FormObject = {} as formData;

    for (const [key, value] of form) {
      FormObject[key] = value;
    }
    await fetch(`${DEVELEPOMENT_URL}/${parentName}`, {
      method: POST,
      body: JSON.stringify(FormObject),
    })
      .then((res: Response) => res.json())
      .then((data: responseData) => {
        LoginStatus.textContent = data.message;
        const statusOfMessage: number = data.status;
        if (statusOfMessage === 0) {
          LoginStatus.style.color = "red";
        }
        if (statusOfMessage === 1) {
          LoginStatus.style.color = "green";
          localStorage.setItem("game", "1");
          setTimeout(() => {
            LoginStatus.textContent = "";
            this.makeLoginPanelInvisible();
            this.changeVisbilityOfGivenElement(startGamePanel, true);
          }, 1000);
        }
      });
  }

  public SendUserAuthData(): void {
    if (this.formElement == null) throw new Error(ELEMENT_DOES_NOT_EXIST);

    const allRegisterElementItems: HTMLCollection = this?.formElement?.children;
    const FORM = "FORM";
    const loginAndRegisterFormNodes: Element[] = Array.from(
      allRegisterElementItems
    ).filter((item: Element) => item.nodeName.toUpperCase() == FORM);

    loginAndRegisterFormNodes.forEach((item: any) => {
      item.addEventListener("submit", (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const createdForm = item as HTMLFormElement;
        const newFormData: FormData = new FormData(createdForm);
        for (const [key, value] of newFormData) {
          //if the name of the input is not Password then continue with loop
          if (key !== PASSWORD) continue;

          //check Password only if this is the form that is not currently hidden aka visible
          const contains: boolean = item.classList.contains(HIDDEN);

          if (contains) return;

          const validator: Validator = new Validator(
            PASSWORD_INPUT_ELEMENT,
            value as string
          );

          const CorrectPassword: boolean = validator.CheckPass();

          if (CorrectPassword) {
            this.sendDataToBackendAuth(newFormData, item.name);
          } else throw new Error(MUST_PUT_VALID_PASS);

          if (value === "") throw new Error(MUST_PUT_VALID_VAL);
        }
      });
    });
  }

  public static async FetchData<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  public static async sendDataToBackend<T>(
    url: string,
    data: T
  ): Promise<void> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: T = await response.json();
    } catch (error) {
      console.error("Error sending data to backend:", error);
      throw error;
    }
  }
}
