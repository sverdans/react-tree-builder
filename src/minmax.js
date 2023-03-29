
var minimax = function (depth, game, alpha, beta, isMaximisingPlayer)
{
	if (depth === 0)
		return -evaluateBoard(game.board());

	var newGameMoves = game.ugly_moves();

	if (isMaximisingPlayer)
	{
		var bestMove = -9999;
		for (var i = 0; i < newGameMoves.length; i++)
		{
			game.ugly_move(newGameMoves[i]);
			bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
			game.undo();
			alpha = Math.max(alpha, bestMove);
			
			if (beta <= alpha)
				return bestMove;
		}
		return bestMove;
	}
	else
	{
		var bestMove = 9999;
		for (var i = 0; i < newGameMoves.length; i++)
		{
			game.ugly_move(newGameMoves[i]);
			bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
			game.undo();
			beta = Math.min(beta, bestMove);
		
			if (beta <= alpha)
				return bestMove;
		}
		return bestMove;
	}
}