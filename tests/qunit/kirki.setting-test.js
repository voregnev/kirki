/* global QUnit, kirki */
/* jshint -W098 */
window.wp = {
	customize: {
		instance: function( setting ) {
			switch ( setting ) {
				case 'setting':
					return {
						get: function() {
							return {
								'subsetting': 'setting[subsetting] value OK.'
							};
						}
					};
				case 'something[ExtremelyLong][AndIrrational]':
					return {
						get: function() {
							return {
								'ThatNobody': {
									'WouldEverUse': {
										'NoMatterWhat': 'value OK.'
									}
								}
							};
						}
					};
			}
		}
	}
};

QUnit.module( 'The kirki.setting object', {}, function() {
	QUnit.module( 'The kirki.setting.get() function', {}, function() {
		QUnit.test( 'kirki.setting.get', function( assert ) {
			assert.equal( 'string', typeof kirki.setting.get( 'setting[subsetting]' ) );
			assert.equal( 'setting[subsetting] value OK.', kirki.setting.get( 'setting[subsetting]' ) );

			assert.equal( 'object', typeof kirki.setting.get( 'something[ExtremelyLong][AndIrrational]' ) );
			assert.deepEqual( {
				'ThatNobody': {
					'WouldEverUse': {
						'NoMatterWhat': 'value OK.'
					}
				}
			}, kirki.setting.get( 'something[ExtremelyLong][AndIrrational]' ) );

			assert.equal( 'object', typeof kirki.setting.get( 'something[ExtremelyLong][AndIrrational][ThatNobody][WouldEverUse]' ) );
			assert.deepEqual( {
				'NoMatterWhat': 'value OK.'
			}, kirki.setting.get( 'something[ExtremelyLong][AndIrrational][ThatNobody][WouldEverUse]' ) );

			assert.equal( 'string', typeof kirki.setting.get( 'something[ExtremelyLong][AndIrrational][ThatNobody][WouldEverUse][NoMatterWhat]' ) );
			assert.equal( 'value OK.', kirki.setting.get( 'something[ExtremelyLong][AndIrrational][ThatNobody][WouldEverUse][NoMatterWhat]' ) );
		} );
	} );
} );
