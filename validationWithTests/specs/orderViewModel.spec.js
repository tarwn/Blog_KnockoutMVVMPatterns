define(['orderViewModel',
		'models/orderModel'
], 
function(OrderViewModel,
		OrderModel
){

	function OrderServiceFake(){
		this.getNewOrder = function(){
			return new OrderModel();
		};
		this.saveOrder = function(){};
	}

	describe('orderViewModel', function(){
	
		describe('createNewOrder', function(){
		
			it('creates an order with one order line', function(){
				var orderService = new OrderServiceFake();
				var viewmodel = new OrderViewModel(orderService);

				viewmodel.createNewOrder();

				expect(viewmodel.order().items().length).toBe(1);
			});

		});
	
	});

});