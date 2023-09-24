import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:shelf_static/shelf_static.dart';

Future<void> startServer() async {
  // var handler =
  //     const Pipeline().addMiddleware(logRequests()).addHandler(_echoRequest);

  var handler = createStaticHandler('./data/flutter_assets/web_assets',
      defaultDocument: 'index.html');

  var server = await shelf_io.serve(handler, 'localhost', 8080);

  // Enable content compression
  server.autoCompress = true;

  print('Serving at http://${server.address.host}:${server.port}');
}
