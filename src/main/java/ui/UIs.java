package ui;

import java.util.Collection;
import java.util.LinkedList;

public class UIs {
	private static Collection<UI> activeUIs = new LinkedList<>();


	public static boolean registerUI(UI ui) {
		return activeUIs.add(ui);
	}

	public static boolean unregisterUI(UI ui) {
		return activeUIs.remove(ui);
	}


	public static void pushToUIs(String message, Object... arguments) {
		for (UI ui : activeUIs)
			ui.push(message, arguments);
	}
}
