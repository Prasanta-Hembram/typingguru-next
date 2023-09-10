import 'dart:io';

import 'package:desktop_webview_window/desktop_webview_window.dart';
import 'package:flutter/material.dart';
import 'package:typing_guru/server.dart';

void main(List<String> args) async {
  if (runWebViewTitleBarWidget(args)) {
    return;
  }
  WidgetsFlutterBinding.ensureInitialized();

  await startServer();

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool? _webviewAvailable;

  @override
  void initState() {
    super.initState();
    WebviewWindow.isWebviewAvailable().then((value) {
      setState(() {
        _webviewAvailable = value;
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // return Container();
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        body: Center(
          child: ElevatedButton(
            onPressed: () {
              if (_webviewAvailable != true) {
                return;
              }
              _onTap("http://localhost:8080/index.html");
            },
            child: const Text('Start Typing Guru'),
          ),
        ),
      ),
    );
  }
}

void _onTap(String url) async {
  final webview = await WebviewWindow.create(
    configuration: CreateConfiguration(
      // userDataFolderWindows: await _getWebViewPath(),
      titleBarTopPadding: Platform.isMacOS ? 20 : 0,
      openMaximized: true,
      title: "Typing Guru",
      useWindowPositionAndSize: true,
      titleBarHeight: -2,
    ),
  );

  webview
    ..setBrightness(Brightness.dark)
    ..setApplicationNameForUserAgent(" WebviewExample/1.0.0")
    ..launch(url)
    ..addOnUrlRequestCallback((url) {
      debugPrint('url: $url');
      final uri = Uri.parse(url);
      if (uri.path == '/login_success') {
        debugPrint('login success. token: ${uri.queryParameters['token']}');
        webview.close();
      }
    })
    ..onClose.whenComplete(() {
      debugPrint("on close");
    });
}
